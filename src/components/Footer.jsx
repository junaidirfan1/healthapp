
function Footer() {
    const date = new Date()
    const year = date.getFullYear();

    return (
        <div className="footer-container">
            <p>© {year} <span>IGI Health</span>, All Rights Reserved.</p>
        </div>
    )
}

export default Footer