function euclideanBeat(sequenceLength, onsets) {
    var r = new Array();
    if (onsets >= sequenceLength || sequenceLength == 1 || onsets == 0) { //test for input for sanity
        if (onsets >= sequenceLength) {
            for (i = 0; i < sequenceLength; i++) { //give trivial rhythm of a pulse on every step
                r.push(1);
            }
        } else if (sequenceLength == 1) {
            if (onsets == 1) {
                r.push(1);
            } else {
                r.push(0);
            }
        } else {
            for (i = 0; i < sequenceLength; i++) {
                r.push(0);
            }
        }
    } else { //sane input
        pauses = sequenceLength - onsets;
        if (pauses >= onsets) { //first case more pauses than onsets
            per_pulse = Math.floor(pauses / onsets);
            remainder = pauses % onsets;
            for (i = 0; i < onsets; i++) {
                r.push(1);
                for (j = 0; j < per_pulse; j++) {
                    r.push(0);
                }
                if (i < remainder) {
                    r.push(0);
                }
            }
        } else { //second case more onsets than pauses
            per_pause = Math.floor( (onsets - pauses) / pauses);
            remainder = (onsets - pauses) % pauses;
            for (i = 0; i < pauses; i++) {
                r.push(1);
                r.push(0);
                for (j = 0; j < per_pause; j++) {
                    r.push(1);
                }
                if (i < remainder) {
                    r.push(1);
                }
            }
        }
    }
    return r;
}