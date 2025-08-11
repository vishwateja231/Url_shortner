import Shortener from "./Shortener"

export default function Main() {
    return <main>
        <Shortener />
        <section className="stats pb-11 lg:pb-20">
            <h3 className="title pb-2">Advanced Statistics</h3>
            <p className="subtitle">Track how many clicks your shortened URLs receive and measure their performance.</p>
        </section>
    </main>
}

