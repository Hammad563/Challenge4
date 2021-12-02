import React from 'react';
import { useEffect, useRef, useState } from 'react';
import Layout from '../../components/layout';
import Data from '../../Data/FaqData'
import {GrAdd,GrFormSubtract } from "react-icons/gr";
import './faq.css';


const Faq =(props) => {
    
    const [selected, setSelected] = useState(null);

    const toggle = (i) => {
        if(selected == i) {
            return setSelected(null)
        }
        setSelected(i)
    }

    return (
      <>
        <Layout>
            <div className='wrapper py-5'>
                <div className="faq">
                        <div className="titlefaq">
                            <h2>Frequently asked questions</h2>
                        </div>

                    {Data.map( (item, index) =>(
                        <div className='item'>
                            <div className="question" onClick={() => toggle(index)}>
                                <h4>{item.question}</h4>
                                <span> {selected == index ? <GrFormSubtract></GrFormSubtract> : <GrAdd></GrAdd>}</span>
                            </div>
                            <div className={selected == index ? 'content show' : 'content'} onClick={() => toggle(index)}  >
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
      </>
    );
}

export default Faq
