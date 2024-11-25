<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Products;
use App\Models\Category_product;
use App\Models\Categories;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $filter = $request->input('filter', 'all');
    
        $user = auth()->user();
    
        $forbiddenCategoryIds = $user->forbiddenCategories()->pluck('categories.id')->toArray();
    
        $query = Products::query()
            ->with('categories')
            ->whereHas('categories', function ($q) use ($forbiddenCategoryIds) {
                $q->whereNotIn('categories.id', $forbiddenCategoryIds);
            })
            ->orderBy('id', 'desc');
    
        if ($search) {
            if ($filter === 'all') {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%')
                      ->orWhere('description', 'like', '%' . $search . '%')
                      ->orWhereHas('categories', function ($q) use ($search) {
                          $q->where('name', 'like', '%' . $search . '%');
                      });
                });
            } else {
                $query->where($filter, 'like', '%' . $search . '%');
            }
        }
    
        $products = $query->paginate(10);
    
        $isSinglePage = $products->lastPage() === 1;
        $prevPageUrl = $isSinglePage ? null : $products->previousPageUrl();
        $nextPageUrl = $isSinglePage ? null : $products->nextPageUrl();
    
        $totalProduct = Products::whereHas('categories', function ($q) use ($forbiddenCategoryIds) {
            $q->whereNotIn('categories.id', $forbiddenCategoryIds);
        })->count();
    
        $categories = Categories::whereNotIn('categories.id', $forbiddenCategoryIds)->get();
    
        return Inertia::render('Products/Index', [
            'products' => [
                'data' => $products->items(),
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'prev_page_url' => $prevPageUrl,
                'next_page_url' => $nextPageUrl,
                'total' => $products->total(),
            ],
            'totalProduct' => $totalProduct,
            'categories' => $categories,
        ]);
    }
    
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'cat_id' => 'required|exists:categories,id',
        ]);
    
        try {
            Products::create($validatedData);
    
            return redirect()
                ->route('product.index')
                ->with('success', 'Product created successfully!');
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withErrors(['error' => 'Failed to create product. Please try again.']);
        }
    }

    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy($id)
    {
        try {
            $product = Products::findOrFail($id);
    
            $product->delete();
    
            return redirect()
                ->route('product.index')
                ->with('success', 'Product deleted successfully!');
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withErrors(['error' => 'Failed to delete product. Please try again.']);
        }
    }    
}
