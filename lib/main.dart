import 'package:flutter/material.dart';
import 'package:bictia_flutter/pages/home.dart';
import 'package:bictia_flutter/pages/list.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.teal,
        primaryColor: Colors.teal[700],
        primaryColorDark: Colors.teal[900],
        accentColor: Colors.limeAccent[700],
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
      /* home: HomePage(), */
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage>
    with SingleTickerProviderStateMixin {
  int _currentPage = 0;

  TabController _controller;

  @override
  void initState() {
    super.initState();
    _controller = TabController(initialIndex: 1, length: 4, vsync: this);
  }

  List<Widget> _pages = [ListPage(), HomePage()];

  void _changePage(int position) {
    setState(() {
      _currentPage = position;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        actions: [
          IconButton(
            icon: Icon(Icons.search),
            onPressed: () {},
          ),
          IconButton(
            icon: Icon(Icons.more_vert),
            onPressed: () {},
          )
        ],
        bottom: TabBar(controller: _controller, tabs: <Widget>[
          Tab(icon: Icon(Icons.camera_alt)),
          Tab(text: 'Chats'),
          Tab(text: 'Status'),
          Tab(text: 'Calls'),
        ]),
        title: Text('Ejemplo bictia'),
      ),
      /* bottomNavigationBar: BottomNavigationBar(
        onTap: _changePage,
        items: [
          BottomNavigationBarItem(title: Text('List'), icon: Icon(Icons.list)),
          BottomNavigationBarItem(title: Text('Home'), icon: Icon(Icons.home))
        ],
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      */
      floatingActionButton:
          FloatingActionButton(child: Icon(Icons.done), onPressed: () {}),
      /* body: _pages[_currentPage], */
      body: TabBarView(
        controller: _controller,
        children: [HomePage(),ListPage(), HomePage(),HomePage()],
      ),
    );
  }
}
