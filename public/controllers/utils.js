function getJSON(yourUrl) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}
Array.prototype.diffArrays = function(a) {
    return this.filter(function(i) {
        return a.indexOf(i) < 0;
    });
};