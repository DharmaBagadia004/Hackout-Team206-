import React from "react";
import "../assets/css/app.css";
import "../assets/js/events";
import "../assets/js/autolink";
import "../assets/js/helpers";
import "../assets/js/rtc";

const Meet = () => {
  return (
    <html>
      <head>
        <title>Multi-User Video Call</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossorigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
          integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
          crossorigin="anonymous"
        />
        {/* <link rel='stylesheet' href='./assets/css/app.css' type="text/css" /> */}
        <script src="/socket.io/socket.io.js"></script>
        {/* <script type="module" src='../assets/js/rtc.js'></script> */}
        <script type="module" src="../assets/js/events.js"></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/webrtc-adapter/7.3.0/adapter.min.js"
          integrity="sha256-2qQheewaqnZlXJ3RJRghVUwD/3fD9HNqxh4C+zvgmF4="
          crossorigin="anonymous"
        ></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js"></script>
        <script src="https://cdn.rawgit.com/yahoo/xss-filters/master/dist/xss-filters.js"></script>
        <script src="assets/js/autolink.js"></script>
      </head>
      <body>
        <div className="custom-modal" id="recording-options-modal">
          <div className="custom-modal-content">
            <div class="row text-center">
              <div class="col-md-6 mb-2">
                <span class="record-option" id="record-video">
                  Record video
                </span>
              </div>
              <div class="col-md-6 mb-2">
                <span class="record-option" id="record-screen">
                  Record screen
                </span>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-12 text-center">
                <button class="btn btn-outline-danger" id="closeModal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <nav className="navbar fixed-top bg-info rounded-0 d-print-none">
          <div class="text-white">Video Call</div>

          <div class="pull-right room-comm" hidden>
            <span class="text-white mr-5">
              Unique Identifier: <span id="randomNumber"></span>
            </span>

            <button
              class="btn btn-sm rounded-0 btn-no-effect"
              id="toggle-video"
              title="Hide Video"
            >
              <i class="fa fa-video text-white"></i>
            </button>

            <button
              class="btn btn-sm rounded-0 btn-no-effect"
              id="toggle-mute"
              title="Mute"
            >
              <i class="fa fa-microphone-alt text-white"></i>
            </button>

            <button
              class="btn btn-sm rounded-0 btn-no-effect"
              id="share-screen"
              title="Share screen"
            >
              <i class="fa fa-desktop text-white"></i>
            </button>

            <button
              class="btn btn-sm rounded-0 btn-no-effect"
              id="record"
              title="Record"
            >
              <i class="fa fa-dot-circle text-white"></i>
            </button>

            <button
              class="btn btn-sm text-white pull-right btn-no-effect"
              id="toggle-chat-pane"
            >
              <i class="fa fa-comment"></i>{" "}
              <span
                class="badge badge-danger very-small font-weight-lighter"
                id="new-chat-notification"
                hidden
              >
                New
              </span>
            </button>

            <button class="btn btn-sm rounded-0 btn-no-effect text-white">
              <a href="/" class="text-white text-decoration-none">
                <i class="fa fa-sign-out-alt text-white" title="Leave"></i>
              </a>
            </button>
          </div>
        </nav>

        <div className="container-fluid" id="room-create" hidden>
          <div class="row">
            <div class="col-12 h2 mt-5 text-center">Create Room</div>
          </div>

          <div class="row mt-2">
            <div class="col-12 text-center">
              <span class="form-text small text-danger" id="err-msg"></span>
            </div>

            <div class="col-12 col-md-4 offset-md-4 mb-3">
              <label for="room-name">Room Name</label>
              <input
                type="text"
                id="room-name"
                class="form-control rounded-0"
                placeholder="Room Name"
              />
            </div>

            <div class="col-12 col-md-4 offset-md-4 mb-3">
              <label for="your-name">Your Name</label>
              <input
                type="text"
                id="your-name"
                class="form-control rounded-0"
                placeholder="Your Name"
              />
            </div>

            <div class="col-12 col-md-4 offset-md-4 mb-3">
              <button id="create-room" class="btn btn-block rounded-0 btn-info">
                Create Room
              </button>
            </div>

            <div
              class="col-12 col-md-4 offset-md-4 mb-3"
              id="room-created"
            ></div>
          </div>
        </div>

        <div className="container-fluid" id="username-set" hidden>
          <div class="row">
            <div class="col-12 h4 mt-5 text-center">Your Name</div>
          </div>

          <div class="row mt-2">
            <div class="col-12 text-center">
              <span
                class="form-text small text-danger"
                id="err-msg-username"
              ></span>
            </div>

            <div class="col-12 col-md-4 offset-md-4 mb-3">
              <label for="username">Your Name</label>
              <input
                type="text"
                id="username"
                class="form-control rounded-0"
                placeholder="Your Name"
              />
            </div>

            <div class="col-12 col-md-4 offset-md-4 mb-3">
              <button id="enter-room" class="btn btn-block rounded-0 btn-info">
                Enter Room
              </button>
            </div>
          </div>
        </div>

        <div className="container-fluid room-comm" hidden>
          <div class="row">
            <video
              class="local-video mirror-mode"
              id="local"
              volume="0"
              autoplay
              muted
            ></video>
          </div>
          <div class="col-md-12 main" id="main-section">
            <div class="row mt-2 mb-2" id="videos"></div>
          </div>

          <div
            class="col-md-3 chat-col d-print-none mb-2 bg-info"
            id="chat-pane"
            hidden
          >
            <div class="row">
              <div class="col-12 text-center h2 mb-3">CHAT</div>
            </div>

            <div id="chat-messages"></div>

            <form>
              <div class="input-group mb-3">
                <textarea
                  id="chat-input"
                  class="form-control rounded-0 chat-box border-info"
                  rows="3"
                  placeholder="Type here..."
                ></textarea>
                <div class="input-group-append" id="chat-input-btn">
                  <button
                    type="button"
                    class="btn btn-dark rounded-0 border-info btn-no-effect"
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Meet;