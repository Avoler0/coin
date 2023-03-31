

export function isNegative(num:number){ // 음수이면 1 양수 0
  if(num >= 0){
    return 0;
  }
  return 1
}

export type windowType = 'desktop' | 'tablet' | 'mobile'

export function windowWidthType(){
  const windowWidth = window.innerWidth;
  
  if(windowWidth < 3000 && windowWidth > 1400) return 'desktop'
  if(windowWidth < 1400 && windowWidth > 520) return 'tablet'
  if(windowWidth < 520 && windowWidth > 0) return 'mobile'
}