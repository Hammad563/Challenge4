import React from "react";
import Layout from "../../components/layout";

const ForgetPassword = () => {
    return(
        <>
        <Layout>
          <div className="contain1">
            <div className="account">
              <div className="title1">Forgot Password</div>
              <div className="account__section">
                <form>
                  <div className="group">
                    <input
                      className="group__control"
                      value=''
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                     
                    ></input>
                  </div>
                  <div className="group">
                    <input
                      className="group__control"
                      value=''
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      
                    ></input>
                  </div>

                  <div className="group">
                    <input
                      className="group__control"
                      value=''
                      name="ConfirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      
                    ></input>
                  </div>

                  <div className="group">
                    <input
                      className="btn1 btn-default btn-block"
                      type="submit"
                      value={"Submit" }
                    ></input>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Layout>
      </>
    )
}

export default ForgetPassword;