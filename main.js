let a=prompt();
let b=prompt();
let c=prompt();

a=parseInt(a);
b=parseInt(b);
c=parseInt(c);

let m,m1,m2;

m=0;
m1=0;
m2=0;

if (a==c) {
    if (b==c) {
         m1=1;
    }
    m=2+m1;
} else {
    if (b==c) {
        m1=1;
    }
    if (b==a) {
    m2=1;
    }
   m=1+m1+m2;
  }

  if (a!=c) {
    if (b!==c) {
         m=0;
    }
}
alert (m)