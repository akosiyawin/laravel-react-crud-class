<?php


namespace App\Services;




use App\Posts;
use \App\Http\Resources\Posts as PostsResource;
use Illuminate\Http\Request;

class PostsService
{
    public function storePost(Request $request): \Illuminate\Http\JsonResponse
    {
        $post = new Posts();
        $post->title = $request->title;
        $post->description = $request->description;
        $post->save();
        return response()->json([
            'message'=> 'Post has been created'
        ]);
    }

    public function updatePost(Request $request,$id)
    {
        $post = Posts::findOrFail($id);
        $post->update([
            'title' => $request->get('title'),
            'description' => $request->get('description')
        ]);

        return response()->json(['message'=>'Post Updated!']);
    }

    public function destroyPost($id)
    {
        $post = Posts::findOrFail($id);
        $post->delete();
        return response()->json(['message'=>'Post Deleted!']);
    }

    public function showOnePost($id)
    {
        return new PostsResource(Posts::findOrFail($id));
    }
}
