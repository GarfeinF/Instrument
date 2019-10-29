let osc
let env
let osc2
let noise
let noiseEnv
let circleX = 0
let circleY = 0
let numInstruments = 4
let maxVol = 0
let volume

function preload(){

}

function setup() {
	let canvas = createCanvas(windowWidth, windowHeight)
	canvas.parent("p5")

	osc = new p5.Oscillator()
	osc2 = new p5.Oscillator()
	env = new p5.Envelope()
	env.setADSR(.1, .1, .3, .1)
    noise = new p5.Noise()
    noise.setType("white") // "brown" "pink"
    noise.amp(0)  // set initial amplitude to 0

    noiseEnv = new p5.Envelope()
    noiseEnv.setADSR(0.01, 0.1, 0, 0)

	osc.start()
	osc.amp(0)

	osc2.start()
	osc2.amp(0)

	volume = new p5.Amplitude()
}

function draw(){

	noStroke()
	for (var i = 0; i < numInstruments; i++) {
		fill(255*(i+1)/numInstruments, 0, 255-(255*i/numInstruments))
		rect(width*i/numInstruments, 0, (width*i/numInstruments)+(width/numInstruments), height)
	}
	
	fill(255-(255*circleY/height), 255, 255*circleY/height)

	ellipse(circleX, circleY, volume.getLevel()*500/maxVol, volume.getLevel()*500/maxVol)

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}

function mousePressed(){

	osc.amp(env)
	osc2.amp(env)
	noise.amp(noiseEnv)
	env.triggerAttack()
	noiseEnv.triggerAttack
	//osc2.start()
	mouseDragged()
}

function mouseReleased() {
	//osc.stop()
	noiseEnv.triggerRelease()
	env.triggerRelease()
}

function mouseDragged() {
	let frequency = map(mouseY, 0, height, 800, 100)
	osc.freq(frequency)

	if (mouseX<width/numInstruments){
		osc.setType("sine")
		osc2.setType("triangle")
		osc2.freq(frequency*870/300)
		env.setADSR(0.1, 0.1, 0.6, 0.1)
		noiseEnv.setADSR(0.1, 0.1, 0.2, 0.1)
		maxVol=5
	}else if (mouseX<2*width/numInstruments){
		osc.setType("sine")
		osc2.setType("square")
		osc2.freq(frequency*229 /27)
		env.setADSR(0.2, 0.1, 0.6, 0.6)
		noiseEnv.setADSR(0.2, 0.1, 0.2, 0.1)
		maxVol=5
	} else if (mouseX<3*width/numInstruments){
		osc.setType("sawtooth")
		osc2.setType("sawtooth")
		osc2.freq(frequency+2)
		env.setADSR(0.1, 0.1, 0.1, 0.1)
		noiseEnv.setADSR(0.1, 0.1, 0.6, 0.1)
		maxVol=0.6
	} else {
		osc.setType("square")
		osc2.setType("triangle")
		osc2.freq(frequency+2)
		env.setADSR(0.1, 0.1, 0.05, 0.1)
		noiseEnv.setADSR(0.1, 0.1, 0.5, 0.1)
		maxVol=0.5
	}

	circleX = mouseX
	circleY = mouseY
}

function touchStarted(){
	mousePressed()
	mouseClicked()
}

function touchEnded(){
	mouseReleased()
}