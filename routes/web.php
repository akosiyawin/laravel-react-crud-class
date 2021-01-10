<?php
use Illuminate\Support\Facades\Route;


Auth::routes();
Route::get('/home', 'HomeController@index')->name('home');

/* pa make:controller Posts -r
Route::resources([
    'posts' => Posts::class
]);*/

//Route::redirect('/here','/there');

/*Optional parameter*/
//Route::view('/{any?}','index');

/*Optional parameter with default value*/
/*Route::get('/{url?}',function ($url = 'posts'){
    return view('index');
})->where('url','^(?!api).*$');*/

/*Return a view as long as the first word of url is not api*/
Route::view('/{url?}','index')->where('url','^(?!api).*$');

