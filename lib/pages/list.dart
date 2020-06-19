import 'package:flutter/material.dart';

class ListPage extends StatefulWidget {
  @override
  State<ListPage> createState() {
    // TODO: implement createState
    return ListState();
  }
}

class ListState extends State<ListPage> {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return new Scaffold(
        body: ListView.builder(
      itemCount: 10,
      itemBuilder: (context, index) => new Column(
        children: [
          new Divider(
            height: 5,
          ),
          new ListTile(
            leading: FlutterLogo(),
            title: new Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Juanito Arcoiris ' + index.toString()),
                Text ('16:55', style: new TextStyle(color: Colors.green, fontSize: 8),)
              ],
            ),
            subtitle: new Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('¿Qué más chino?'),
                Text('20', style: new TextStyle(color: Colors.green, fontSize: 8))
              ],
            ),
          )
        ],
      ),
    )
        /* body: ListView(
        children: <Widget>[
          ListTile(
            leading: FlutterLogo(),
            title: Text('Juanito Arcoiris'),
            subtitle: Text('¿Qué más chino?'),            
          ),          
          ListTile(
            leading: FlutterLogo(),
            title: Text('El señor X'),
            subtitle: Text('¿Quiere ser su propio jefe?'),            
          ),
        ],
      ), */
        );
  }
}
