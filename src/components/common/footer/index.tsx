import React, { Component } from "react";
import "./index.css";

class Footer extends Component {
    render() {
        return (
            <div className='footer-container'>
                <section className='footer-subs'>
                    <p className='footer-subs-heading'>Simplify your expenses for you and your team</p>
                    <p className='footer-subs-text'>You can subscribe at any time!</p>
                    <div className='input-area'>
                        <form>
                            <input type='email' name='email' placeholder='Enter your email' className='footer-input' />
                            <button className='btn-footer'>Subscribe</button>
                        </form>
                    </div>
                </section>
                <p className='copyrights'>Expense Tracker © 2022</p>
            </div>
        );
    }
}

export default Footer;