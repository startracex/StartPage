import React from "react";

export default class Search extends React.Component<any, any> {

   constructor(props: any) {
      super(props);
      this.state = {
         value: ""
      };
   }

   componentDidMount() {
      document.addEventListener("keydown", (e: any) => {
         if (e.keyCode === 13) {
            this.handelSearch();
            console.log("enter search");
         }
      });
   }

   inputOnBlur = () => {
      this.props.inputOnBlur();
   };

   inputOnFocus = () => {
      this.props.inputOnFocus();
   };


   onKeyDown = (e: any) => {
      if (e.keyCode === 13) {
         this.handelSearch();
      }
   };
   handleChange = (e: any) => {
      this.setState({ value: e.target.value });
   };
   handelSearch = () => {
      switch (Number(this.props.engine)) {
         case 0:
            //bing cn
            window.location.href = "https://cn.bing.com/search?q=" + this.state.value;
            break;
         case 1:
            //bing en
            window.location.href = "https://cn.bing.com/search?q=" + this.state.value + "&ensearch=1";
            break;
         case 2:
            //google
            window.location.href = "https://www.google.com.hk/search?q=" + this.state.value;
            break;
         case 3:
            //quark
            window.location.href = "https://quark.sm.cn/s?q=" + this.state.value;
            break;
         case 4:
            //baidu
            window.location.href = "https://www.baidu.com/s?wd=" + this.state.value;
            break;
         default:
            window.location.href = "https://cn.bing.com/search?q=" + this.state.value;
            break;
      }
   };
   render(): React.ReactNode {

      return <div id="searchbar">


         <input type="search" value={this.state.value}
            onChange={this.handleChange}
            onBlur={this.inputOnBlur}
            onFocus={this.inputOnFocus}
         />
         <button id="search" onClick={this.handelSearch} >
            <svg className="icon" viewBox="0 0 1024 1024" version="1.1" p-id="3056" width="32"
               height="32">
               <path
                  d="M921.3 874L738.1 690.8c51.3-62.6 82.1-142.5 82.1-229.6 0-200.1-162.8-363-363-363-200.1 0-363 162.8-363 363s162.8 363 363 363c87 0 167-30.8 229.6-82.1L870 925.3c7.1 7.1 16.4 10.6 25.7 10.6s18.6-3.5 25.7-10.6c14.1-14.2 14.1-37.2-0.1-51.3zM166.8 461.2c0-160.1 130.3-290.4 290.4-290.4s290.4 130.3 290.4 290.4-130.3 290.4-290.4 290.4-290.4-130.3-290.4-290.4z"
                  p-id="3057" fill="#f4f4f4"></path>
            </svg>
         </button>
      </div>;
   }
}

