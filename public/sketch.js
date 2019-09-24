let fft = new p5.FFT();
let bass = fft.getEnergy( "bass" );
let treble = fft.getEnergy( "treble" );
let mid = fft.getEnergy( "mid" );
let custom = fft.getEnergy( 100, 200 );


function setup() { // Define in how many pieces you want to divide the circle
    var pieces = 32;

    // Circle's radius
    var radius = 200;

    // Move the origin to the center of the canvas
    translate( width/2, height/2 );

    // The centered circle
    stroke( 0, 0, 255 );
    ellipse( 0, 0, radius );

    // For each piece draw a line
    for( i = 0; i < pieces; i++ ) {

        // Rotate the point of origin
        rotate( TWO_PI / pieces );

        // Draw the red lines
        stroke( 255, 0, 0 );
        line( 10, radius/2, 0, radius );

        //Optionally also draw to the opposite direction
        stroke( 0 );
        line( -10, radius/2, 0, radius );
    }
}

export {setup}