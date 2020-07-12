import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

const ContactUsLanding = () => {
  return (
    <Fragment>
      <header id="page-header">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto text-center">
              <h1>যোগাযোগ</h1>
            </div>
          </div>
        </div>
      </header>
      <section className="my-5 text-center">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="info-header mb-5">
                <img
                  src="/uploads/juthika.jpg"
                  alt=""
                  className="img-fluid rounded-circle w-50 mb-3"
                />
                <h1 className="text-primary pb-3">যুথিকা রায়</h1>
                <p className="lead">
                  আমি সাধারণ এক গৃহবধূ। ছাত্রী জীবন শেষ করেই বিয়ের পিঁড়িতে
                  বসেছি।পঁয়ত্রিশ বছর স্বামী পুত্র নিয়ে সংসার করে এখন প্রায় অবসর
                  জীবন যাপন করছি। এর মধ্যে বেড়াতে যাওয়া, বই পড়া, গান শোনা, একটি
                  সংগঠনের কিছু কাজ করা এগুলো আমার জীবনে দক্ষিনের খোলা জানলার
                  মতো। আমার চিন্তা ভাবনা, ভালোলাগা, মন্দলাগার অভিজ্ঞতা ভাগ করে
                  নিতে চাই বন্ধুদের সাথে। তাই এই প্রচেষ্টা যূথিকার কথা
                </p>
              </div>
            </div>
          </div>

          <h1 className="text-primary pb-3">সহযোগিতায়</h1>
          <div className="row" id="authors">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <img
                    src="/uploads/debasish.jpg"
                    alt=""
                    className="img-fluid rounded-circle w-50 mb-3"
                  />
                  <h3>দেবাশিস রায়</h3>
                  <h5 className="text-muted">Photography</h5>
                  <p>
                    পেশা ছিলো ব্যাংকার, নেশা বইপড়া, গান শোনা, বেড়ানো, আর
                    প্রধানতঃ ফটোগ্রাফি, যা আমাকে সেই শৈশব থেকেই বেঁধে রেখেছে।
                    হাতেখড়ি বাবার কিনে দেওয়া ক্লিক থ্রি দিয়ে, সেই যখন ক্লাস টেনে
                    পড়ি। আর এখন তো ডিজিটালের যুগ, তাই আমাকেও মাধ্যম বদলাতে হয়েছে
                    যুগোপযোগী হতে। যতই বদলাক, ফটোগ্রাফি তার আকর্ষণ একটুও
                    হারায়নি, আজও। তবে, আমি কিন্তু আজও শিখছি, শিখেই চলবো --
                  </p>
                  <div className="d-flex justify-content-center">
                    <div className="p-4">
                      <a href="http://facebook.com">
                        <i className="fab fa-facebook" />
                      </a>
                    </div>
                    <div className="p-4">
                      <a href="http://twitter.com">
                        <i className="fas fa-envelope" />
                      </a>
                    </div>
                    <div className="p-4">
                      <a href="http://instagram.com">
                        <i className="fab fa-instagram" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <img
                    src="/uploads/debjit.jpg"
                    alt=""
                    className="img-fluid rounded-circle w-50 mb-3"
                  />
                  <h3>দেবজিৎ রায় </h3>
                  <h5 className="text-muted">Developer</h5>
                  <p>
                    পেশায় কম্পিউটার ডেভেলপার। কাজের সূত্রে আপাতত আমেরিকার
                    ক্যালিফোর্নিয়ায়। লেখিকার পুত্র। ভালোবাসি বেড়াতে, বিশেষত
                    পাহাড় - জঙ্গল। প্রকৃতিকে ভালোবাসতে শেখা বাবা-মা র কাছ থেকেই।
                    তাই অপেক্ষায় থাকি মার নতুন লেখার আর বাবার ফটোগ্রাফির। সেই
                    ভালোলাগাগুলো আর আমার জীবিকার সূত্রে শেখা প্রযুক্তিকে হাতিয়ার
                    করে এই বাতায়নটি, মা র লেখনীকে আপনাদের কাছে পৌঁছে দেওয়ার
                    সামান্য এই প্রচেষ্টা।
                  </p>
                  <div className="d-flex justify-content-center">
                    <div className="p-4">
                      <a href="http://facebook.com">
                        <i className="fas fa-envelope"></i>
                      </a>
                    </div>
                    <div className="p-4">
                      <a href="http://twitter.com">
                        <i className="fab fa-github"></i>
                      </a>
                    </div>
                    <div className="p-4">
                      <a href="http://instagram.com">
                        <i className="fab fa-linkedin"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <img
                    src="/uploads/paromita.jpg"
                    alt=""
                    className="img-fluid rounded-circle w-50 mb-3"
                  />
                  <h3>পারমিতা রায়</h3>
                  <h5 className="text-muted">Assistant Developer</h5>
                  <p>
                    লেখিকার পুত্রবধূ। এই প্রচেষ্টার সঙ্গী হয়ে আমি কখনো মা-র
                    প্রুফ-রিডার, কখনো স্বামীর সহকর্মী। ভ্রমণ এবং ভ্রমণ কাহিনী
                    দুটি ই খুব প্রিয়। পেশায় ছিলাম হাসপাতাল এডমিনিস্ট্রেটর , এখন
                    আমেরিকায় আপাতত বাড়িতেই। দেবজিতের কাছে শিখছি কম্পিউটারের
                    খুঁটিনাটি সময় বের করে, আর ভালোলাগছে নতুন এই প্রচেষ্টা।
                  </p>
                  <div className="d-flex justify-content-center">
                    <div className="p-4">
                      <a href="http://facebook.com">
                        <i className="fas fa-envelope"></i>
                      </a>
                    </div>
                    <div className="p-4">
                      <a href="http://twitter.com">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </div>
                    <div className="p-4">
                      <a href="http://instagram.com">
                        <i className="fab fa-linkedin"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="col-lg-3 col-md-6">
              <div className="card">
                <div className="card-body">
                  <img
                    src="img/person3.jpg"
                    alt=""
                    className="img-fluid rounded-circle w-50 mb-3"
                  />
                  <h3>John Doe</h3>
                  <h5 className="text-muted">Editor</h5>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                    commodi nostrum, ab libero voluptas officia.
                  </p>
                  <div className="d-flex justify-content-center">
                    <div className="p-4">
                      <a href="http://facebook.com">
                        <i className="fab fa-facebook"></i>
                      </a>
                    </div>
                    <div className="p-4">
                      <a href="http://twitter.com">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </div>
                    <div className="p-4">
                      <a href="http://instagram.com">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="card">
                <div className="card-body">
                  <img
                    src="img/person4.jpg"
                    alt=""
                    className="img-fluid rounded-circle w-50 mb-3"
                  />
                  <h3>Kevin Swanson</h3>
                  <h5 className="text-muted">Designer</h5>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                    commodi nostrum, ab libero voluptas officia.
                  </p>
                  <div className="d-flex justify-content-center">
                    <div className="p-4">
                      <a href="http://facebook.com">
                        <i className="fab fa-facebook"></i>
                      </a>
                    </div>
                    <div className="p-4">
                      <a href="http://twitter.com">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </div>
                    <div className="p-4">
                      <a href="http://instagram.com">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default ContactUsLanding;
