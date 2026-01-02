import './Main.css'
import About from '../About/About'
import Preloader from '../Preloader/Preloader'

function Main() {
  const isLoading = false

  return (
    <main className="main">
      {isLoading ? <Preloader /> : <About />}
    </main>
  )
}

export default Main