<?php

namespace App\Http\Controllers;

use App\Services\PostsService;
use Illuminate\Http\Request;
use \App\Http\Resources\Posts as PostResource;
class Posts extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return PostResource::collection(\App\Posts::all());
    }

    /**
     * Show the form for creating a new resource.
     * Todo: We can delete this function since our views are
     *  handled by React frontend
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param PostsService $service
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request,PostsService $service): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'title' => ['required','max:255'],
            'description' => ['required']
        ]);
        return $service->storePost($request);
    }

    /**
     * Display the specified resource.
     *
     * @param PostsService $service
     * @param int $id
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function show(PostsService $service,$id)
    {
        return $service->showOnePost($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param PostsService $service
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, PostsService $service,$id)
    {
        $request->validate([
            'title' => ['required','max:255'],
            'description' => ['required']
        ]);
        return $service->updatePost($request,$id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param PostsService $service
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(PostsService $service,$id)
    {
        return $service->destroyPost($id);
    }
}
