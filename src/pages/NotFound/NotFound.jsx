import Seo from '../../components/Seo/Seo'
import Button from '../../components/Button/Button'

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" description="The page you’re looking for doesn’t exist." path="/404" />
      <section className="section container center-text">
        <div className="stack" style={{ alignItems: 'center', maxWidth: 520, margin: '0 auto' }}>
          <span className="eyebrow">404</span>
          <h1>This Page Took a Different Path</h1>
          <p className="lead">
            The page you’re looking for isn’t here — but your journey doesn’t have to stop.
          </p>
          <div className="cta-actions" style={{ marginTop: 8 }}>
            <Button to="/" variant="primary">
              Back Home
            </Button>
            <Button to="/how-it-works" variant="secondary">
              How It Works
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
