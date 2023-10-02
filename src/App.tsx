import React from 'react';
import Time from './layout/time';
import Search from './layout/search';
import Img from './layout/img';
import { save, read, dele } from './func/storage';
class App extends React.Component<any, any> {
  fileInput: React.RefObject<any>;

  constructor(props: any) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      BackgroundColor: read("BC") || "#46D2AF",
      UIOpacity: read("UIO") || 1,
      BackgroundImage: read("BI") || false,
      SearchEngine: read("SE") || 0,
      TimeBarDisplay: read("TBD") || 3,
      LocalBackgroundImage: read("LBI") || undefined,
      LocalBackgroundName: read("LBN") || undefined,
    };
    console.log("Enabled:");
    console.table(this.state);
  }

  inputOnBlur = () => {
    this.setState(
      { InoutFocused: false }
    );
  };
  inputOnFocus = () => {
    this.setState(
      { InoutFocused: true }
    );
  };

  handleBC = (e: any) => {
    this.setState({
      BackgroundColor: e.target.value
    });
    save('BC', e.target.value);
  };
  handleUIO = (e: any) => {
    this.setState(
      {
        UIOpacity: e.target.value
      }
    );
    save('UIO', e.target.value);
  };
  handleBI = () => {
    var s = !this.state.BackgroundImage;
    this.setState(
      {
        BackgroundImage: !this.state.BackgroundImage
      }
    );
    save("BI", s);
    console.log(s);
    if (s && !this.state.Changed)
      this.setState(
        {
          LoadingText: <span style={{ position: "absolute" }}>正在请求</span>
        }
      );
    setTimeout(() => {
      this.setState(
        {
          Changed: true,
          LoadingText: <></>
        }
      );
    }, 850);
  };
  handleSE = (e: any) => {
    this.setState(
      {
        SearchEngine: Number(e.target.value)
      }
    );
    save('SE', e.target.value);
  };
  handleTBD = (e: any) => {
    this.setState(
      {
        TimeBarDisplay: Number(e.target.value)
      }
    );
    save('TBD', e.target.value);
  };
  handleLBI = () => {
    var name = this.fileInput.current.files[0].name;
    var file = this.fileInput.current.files[0];
    this.setState(
      { LocalBackgroundName: name }
    );
    if (!/image\/\w+/.test(file.type)) return;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      save("LBI", this.result);
      save("LBN", name);
    };
  };
  LBIremove = () => {
    this.setState({
      LocalBackgroundImage: undefined,
      LocalBackgroundName: undefined,
    });
    dele("LBI");
    dele("LBN");
  };
  render(): React.ReactNode {
    document.body.style.backgroundColor = this.state.BackgroundColor;
    let FocusStyle = this.state.InoutFocused ? "#33333333" : "";
    return (
      <>
        <div style={{ height: "100vh", backgroundColor: FocusStyle }}>
          <main style={{
            opacity: this.state.UIOpacity,
          }}>
            <Time enable={this.state.TimeBarDisplay} />
            <Search engine={this.state.SearchEngine}
              inputOnBlur={this.inputOnBlur}
              inputOnFocus={this.inputOnFocus}
            />
          </main>
        </div>
        <footer>
          <div id="switch">
            <svg className="rotate" width="54" height="54" viewBox="0 0 48 48" fill="none">
              <path d="M12 24L24 12L36 24" stroke="#232222" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round" />
              <path d="M12 36L24 24L36 36" stroke="#232222" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round" />
            </svg>
          </div>
          <div className="setting"  >
            <div>
              <h3>背景图像</h3>
              <input style={{ width: "11.8em" }} type="button" value={this.state.BackgroundImage ? "关闭必应每日图像" : "启用必应每日图像"} onClick={this.handleBI} />
              {this.state.LoadingText}
              <div>
                <button className='withfile'>
                  本地图像
                  <input style={{ "opacity": 0 }} type="file" ref={this.fileInput} onChange={this.handleLBI} />
                </button>
                {this.state.LocalBackgroundName ? <input type="button" value={"清除 " + this.state.LocalBackgroundName} onClick={this.LBIremove} /> : <span>未选择文件</span>}
              </div>
              <input style={{ width: "6.7em" }} type="color" value={this.state.BackgroundColor} onChange={this.handleBC} />
              <span> {this.state.BackgroundColor} </span>
            </div>
            <div>
              <h3>UI</h3>
              <input type="range" value={this.state.UIOpacity} max="1" min="0.20" step="0.01" onChange={this.handleUIO} />
              {this.state.UIOpacity === 1 ? "1.00" : String(this.state.UIOpacity).padEnd(4, "0")}
            </div>
            <div>
              <h3>搜索引擎</h3>
              <select value={this.state.SearchEngine} onChange={this.handleSE}>
                <option value="0">必应</option>
                <option value="1">Bing(GO)</option>
                <option value="2">Google</option>
                <option value="3">神马</option>
                <option value="4">百度</option>
              </select>
            </div>
            <div>
              <h3>
                时间显示
              </h3>
              <select value={this.state.TimeBarDisplay} onChange={this.handleTBD}>
                <option value="0">无</option>
                <option value="1">最少</option>
                <option value="2">较少</option>
                <option value="3">默认</option>
                <option value="4">全部</option>
              </select>
            </div>
            <div>
              <h3>重置为默认值</h3>
              <input type="button" value="全部重置" onClick={() => { window.localStorage.clear(); window.location.reload(); }} />
            </div>
            <h3>
              <a href="https://github.com/STARTRACEX">&copy; {new Date().getFullYear()} STARTRACEX</a>
            </h3>
            <details>
              <summary>
                Version 1.3
              </summary>
              <a href="/">v1.x</a>
              <a href="/v0.html">v0.x</a>
            </details>
          </div>
        </footer>
        <Img bing={this.state.BackgroundImage}></Img>
      </>
    );
  }
}
export default App;