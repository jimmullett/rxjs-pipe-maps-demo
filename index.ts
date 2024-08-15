import { fromEvent, interval } from 'rxjs';
import { concatMap, exhaustMap, mergeMap, switchMap, map, take } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const lists =['mergeMap', 'switchMap', 'concatMap', 'exhaustMap']

clicks
  .pipe(
    mergeMap(event => interval(1000).pipe( map(i => i*2), take(5)))
  )
  .subscribe(
    (x:any) => logItem(x, 'mergeMap')
  );

clicks
  .pipe(
    switchMap(event => interval(1000).pipe( map(i => i*2), take(5)))
  )
  .subscribe(
    (x:any) => logItem(x, 'switchMap')
);

clicks
  .pipe(
    concatMap(event => interval(1000).pipe( map(i => i*2), take(5)))
  )
  .subscribe(
    (x:any) => logItem(x, 'concatMap')
);

clicks
  .pipe(
    exhaustMap(event => interval(1000).pipe( map(i => i*2), take(5)))
  )
  .subscribe(
    (x:any) => logItem(x, 'exhaustMap')
);

clicks
  .subscribe(
    (x:any) => showClick()
);


function logItem(val:any, list: string) {
  var node = document.createElement("li");
  var textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById(list).appendChild(node);
}

function showClick() {
  lists.forEach(list => {
    var node = document.createElement("li");
    var textnode = document.createTextNode('click');
    node.setAttribute('class', 'click');
    node.appendChild(textnode);
    document.getElementById(list).appendChild(node);
  })
}

