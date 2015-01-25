
It is very simple to use.


Preview [www.falbaponce.es/ejemplos/countDown/](www.falbaponde.es/ejemplos/countDown/)


Just have to include jQuery in the head of the page and js.js file in the bottom of the page before </ body>.

To call the script just need to call the function relojCuentaAtras (hour, day, month, year, 'jquery selector')

-Time, Day, month and year should be int, jquery selector must be string.

-Time, Day, month and year are the parameters of the future date when the count down will reach 0.


The jquery selector is where we want to display the count down.

example:

to be viewed in a div with id = countDown:

<div id = "countDown"> </ div>


<script type = "text / javascript">
$ (document) .ready (function () {
relojCuentaAtras (17,28,9,2015, 'token.');

}); // End ready

</ script>

This too will create and execute necessary to include it in the node with the id = "countDown".
