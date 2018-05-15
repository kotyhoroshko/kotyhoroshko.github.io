function findAlive() {
    var alive = 0;
    var iklo = 0;
    for (var i = guiltys.length - 1; i >= 0; i--) {
        if (iklo == 0) { alive++; }
        if (iklo > +guiltys[i]) {
            iklo--;
        } else { iklo = guiltys[i]; }
    }
    showAlive(alive);
}