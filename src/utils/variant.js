// import { duration } from "moment"

export const fadeIn=(direction)=>{
    return{
        hidden:{
            y:direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
            opacity:0,
            x:direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
        },
        show:{
            y:0,
            x:0,
            opacity:1,
            transition:{
                type:"tween",
                duration:1.2,
                ease:[0.25,0.25,0.25,0.75]
            }
        }
    }
}