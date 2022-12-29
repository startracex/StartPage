import React from 'react';

export default class App extends React.Component<any, any>{
   constructor(props: any) {
      super(props);
      this.state = { date: new Date() };
   }
   timerID: NodeJS.Timer | undefined
   componentDidMount() {
      this.timerID = setInterval(
         () => this.tick(),
         250
      );
   }

   componentWillUnmount() {
      clearInterval(this.timerID);
   }

   tick() {
      this.setState({
         date: new Date()
      });
   }
   formatdate = (locale: string): string => {
      const date = new Intl.DateTimeFormat(locale).format(new Date())
      return date.replaceAll(/\//g, "-")
   }
   formatday = (locale: string): string => {
      return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(new Date())
   }
   locale: string = typeof this.props.l == "undefined" ? 'zh' : this.props.l
   render(): React.ReactNode {
      if (this.props.enable > 0)
         return (
            <div id="timebar">
               {this.props.enable > 0 && (<>
                  <span>
                     {this.state.date.toLocaleTimeString("zh", { hour12: false })}
                  </span>
               </>)}
               {this.props.enable > 1 && (<>
                  <span>
                     {this.formatdate(this.locale)}
                  </span>
               </>)}
               {this.props.enable > 2 && (<>
                  <span>
                     {this.formatday(this.locale)}
                  </span>
               </>)}
               {this.props.enable > 3 && (<>
                  <span>
                     {'UTC+' + (0 - new Date().getTimezoneOffset() / 60)}
                  </span>
               </>)}
            </div>
         );
      else return null;
   }
}