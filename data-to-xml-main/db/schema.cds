namespace my.company;

entity Employee {
  key ID : UUID;
  firstName : String(50);
  lastName : String(50);
  email : String(100);
  position : String(50);
}