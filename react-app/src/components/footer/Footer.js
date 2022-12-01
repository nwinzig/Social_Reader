import './footer.css'

function Footer(){
    return (
        <footer>
            <div className='footerWrapper'>
                <div className='footerLeft'>
                    <div id='addMarginRight'>
                        Social Reader
                    </div>
                    <a href='https://github.com/nwinzig/Social_Reader'
                    target='_blank'
                    >
                        Project Repo
                    </a>
                </div>
                <div className='footerRight'>
                    <div id='addMarginRight'>
                        Noah Winzig
                    </div>
                    <a href='https://github.com/nwinzig' id='addMarginRight'
                    target='_blank'
                    >
                        <i class="fa-brands fa-github fa-lg"></i>
                    </a>
                    <a href='https://www.linkedin.com/in/noah-winzig-30588b231/'
                    id='addMarginRight'
                    target='_blank'
                    >
                        <i class="fa-brands fa-linkedin fa-lg"></i>
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
