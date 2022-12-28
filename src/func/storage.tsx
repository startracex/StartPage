export function save(name: string, value: any) {
   window.localStorage.setItem(name, JSON.stringify(value));
}
export function read(name: string) {
   return tryParse(window.localStorage.getItem(name));
}
export function dele(name: string) {
   localStorage.removeItem(name);
}
// 尝试解析为json
export function tryParse(v: any) {
   let x: any;
   try {
      x = JSON.parse(v);
   } catch {
      x = v;
   }
   return x;
}