import React from "react";
import NavBar from "./navbar";
import "../../assets/css/Style";
import Footer from "./footer";

const Home: React.FC = () => {
    return (
        <>
            <NavBar />
            <div className='home-container'>
                <h1 style={{ textAlign: "center" }}>Welcome</h1>
            </div>
            <Footer />
        </>
    )
}

export default Home;