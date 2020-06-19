import 'package:flutter/material.dart';

class HomePage extends StatefulWidget{
  
  @override
  State<HomePage> createState() {
    // TODO: implement createState
    return HomeState();
  }
}

class HomeState extends State<HomePage>{
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return new Scaffold(
      body: Text('Soy un inicio'),
    );
  }

}

