import React from "react";
import '../../components/style/footer.css';

const Footer = () => {
    return (
        <>
            {/* <section>Footer Example 4</section> */}
            <footer className="footer-distributed clearfix">

                <div className="footer-left">

                    <div className="footer-logo">Oh My Stack!</div>
                    <p></p>

                    {/* <p className="footer-links">
                        <a href="#" className="link-1">Home</a>

                        <a href="#">Blog</a>

                        <a href="#">Pricing</a>

                        <a href="#">About</a>

                        <a href="#">Faq</a>

                        <a href="#">Contact</a>
                    </p> */}

                    <p className="footer-company-name">Copyright©2023 Stackful All rights reserved.</p>
                </div>

                <div className="footer-center">

                    <div>
                        <i className="fa fa-map-marker"></i>
                        <p><span>G밸리캠퍼스</span>서울 금천구 가산디지털1로 25, 대륭테크노타운 17차 18층 플레이데이터</p>
                    </div>

                    <p></p>

                    <div>
                        <i className="fa fa-phone"></i>
                        <p>Tel : 010-8976-2226</p>
                    </div>

                    <p></p>

                    <div>
                        <i className="fa fa-envelope"></i>
                        <p>wkddlghwls@gmail.com</p>
                    </div>

                    <p></p>
                    
                    <div>
                        <i className="fa fa-github"></i>
                        <p><a href="https://github.com/Atopiano/Oh_My_Stack">OhMyStack@github.io</a></p>
                    </div>

                    {/* <p></p>

                    <div>
                        <i className="fa fa-blog"></i>
                        <p><a href="https://festive-yard-28c.notion.site/Project-Oh-My-Stack-65ffc7d88cee4a1188a972b22f1ba399">OhMyStack@notion.so</a></p>
                    </div> */}

                    {/* <p></p>

                    <div>
                        <i className="fa fa-youtube"></i>
                        <p><a href="https://youtu.be/urb2sGPst1o">OhMyStack@youtube.com</a></p>
                    </div>

                    <p></p> */}

                </div>

                <div className="footer-right">

                    <p className="footer-company-about">
                        <span>About the company</span>
                        LET'S STACK!
                    </p>

                    <div className="footer-icons">

                        <a href="https://youtu.be/urb2sGPst1o"><i className="fa fa-youtube"></i></a>
                        <a href="https://festive-yard-28c.notion.site/Project-Oh-My-Stack-65ffc7d88cee4a1188a972b22f1ba399"><i className="fa fa-blog"></i></a>
                        <a href="https://github.com/Atopiano/Oh_My_Stack"><i className="fa fa-github"></i></a>

                    </div>

                </div>

            </footer>

        </>
    );
}


export default Footer;