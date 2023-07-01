import Robot from './Robot.js'

export default class FlyingRobot extends Robot
{
    constructor(name, legs)
    {
        super(name, legs)

        this.canFly = true
    }

    sayHi()
    {
        console.log(`Hello! My name is ${this.name} and I'm a flying robot`)
    }

    takeOff()
    {
        console.log(`Have a good flight ${this.name}`)
    }

    land()
    {
        console.log(`Welcome back ${this.name}`)
    }
}