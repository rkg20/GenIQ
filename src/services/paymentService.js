import { request, PAYMENT_API_URL } from './api'

// Payment abstraction layer.
// IMPORTANT: never place secret payment keys here. Anything shipped in the
// frontend build is public. Real checkout creation, verification, refunds and
// webhooks run on the Spring Boot payment-service / provider.

const PAYMENT_PROVIDER = import.meta.env.VITE_PAYMENT_PROVIDER || 'placeholder'

/**
 * Create a checkout. When a payment-service URL is configured this calls the
 * backend which persists the order and returns a reference. Otherwise it
 * returns a development placeholder so no payment is processed.
 */
export async function createCheckout(order) {
  if (!PAYMENT_API_URL || PAYMENT_PROVIDER === 'placeholder') {
    return {
      status: 'placeholder',
      message: 'Payment integration coming soon.',
      provider: PAYMENT_PROVIDER,
      order,
    }
  }

  const res = await request('/api/payments/checkout', {
    method: 'POST',
    body: order,
    baseUrl: PAYMENT_API_URL,
  })
  return res.ok ? res.data : { status: 'error', message: res.message || 'Checkout failed', order }
}

/**
 * Poll / fetch the status of a payment from the payment-service.
 */
export async function getPaymentStatus(reference) {
  if (!PAYMENT_API_URL || PAYMENT_PROVIDER === 'placeholder') {
    return { status: 'placeholder', reference }
  }
  const res = await request(`/api/payments/status?ref=${reference}`, { baseUrl: PAYMENT_API_URL })
  return res.ok ? res.data : { status: 'error', reference }
}

/**
 * Verify a completed Razorpay payment on the backend. The signature is checked
 * server-side before the order is marked paid.
 */
export async function verifyPayment(payload) {
  const res = await request('/api/payments/verify', {
    method: 'POST',
    body: payload,
    baseUrl: PAYMENT_API_URL,
  })
  return res.ok ? res.data : { status: 'error', message: res.message || 'Verification failed' }
}

/**
 * Dynamically load the Razorpay Checkout script once.
 */
function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false)
    if (window.Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

/**
 * Opens the Razorpay checkout modal for a created order and resolves with the
 * verified backend result. `order` is the response from createCheckout().
 * `customer` provides prefill fields.
 */
export async function openRazorpayCheckout(order, customer = {}) {
  const loaded = await loadRazorpayScript()
  if (!loaded) {
    return { status: 'error', message: 'Could not load payment gateway.' }
  }

  return new Promise((resolve) => {
    const options = {
      key: order.publicKey,
      amount: order.amount,
      currency: order.currency,
      name: 'GenIQ',
      description: `Plan: ${order.planId}`,
      order_id: order.gatewayOrderId,
      prefill: {
        name: customer.name || '',
        email: customer.email || '',
        contact: customer.phone || '',
      },
      theme: { color: '#168A9A' },
      handler: async (response) => {
        const verified = await verifyPayment({
          reference: order.reference,
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
        })
        resolve(verified)
      },
      modal: {
        ondismiss: () => resolve({ status: 'cancelled', reference: order.reference }),
      },
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  })
}

export const paymentProvider = PAYMENT_PROVIDER
