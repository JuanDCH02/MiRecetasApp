import {z} from 'zod'

//TAGS
export const recipeTags = [
    'desayuno',
    'dulce',
    'salado',
    'pastas',
    'carnes',
    'vegetariano',
    'sin tacc',
    'merienda',
    'con vegetales',
    'pescados'
]

//COMMENTS
export const CommentSchema = z.object({
    _id: z.string(),
    author_id: z.string(),
    author_name: z.string(),
    content: z.string(),
    recipe: z.string(),
    createdAt: z.string()
})
export type Comment = z.infer<typeof CommentSchema>

//INGREDIENTS
export const IngredientSchema = z.object({
    name: z.string(),
    amount: z.number(),
    unit: z.string(),
})
export type Ingredient = z.infer<typeof IngredientSchema>

// RECIPES 
export const RecipeSchema = z.object({
    _id: z.string(),
    title: z.string(),
    cookTime: z.number(),
    portions: z.number(),
    tags: z.array(z.string()),
    steps: z.array(z.object({ step: z.string() })),
    likesCount: z.number(),
    isLiked: z.boolean(),
    comments: z.array(CommentSchema),
    ingredients: z.array(IngredientSchema),
    image: z.string(),
})
export const DashboardRecipeSchema = z.array(
    RecipeSchema.pick({
        _id:true,
        title:true,
        cookTime:true,
        portions:true,
        tags:true,
        likesCount:true,
        isLiked:true,
        image:true,
    })
)

export type Recipe = z.infer<typeof RecipeSchema>
export type DashboardRecipe = z.infer<typeof DashboardRecipeSchema>
export type RecipeCardType = Pick<Recipe, '_id'|'title'|'likesCount'|'cookTime'|'tags' | 'portions'|'isLiked'|'image' >
export type RecipeCardProfile = Pick<Recipe, '_id'|'title'|'likesCount'|'cookTime'|'portions'|'image' >
export type CreateRecipeFormValues = Pick<Recipe, 'title'|'cookTime'|'portions'|'steps'|'ingredients'|'image'|'tags'>

//AUTH
export const userSchema = z.object({
    _id: z.string(),
    name: z.string(),
    email: z.email(),
    favorites: z.array(z.string()),
})

const AuthSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
    password_confirmation: z.string(),
})
export type Auth = z.infer<typeof AuthSchema>
export type User = z.infer<typeof userSchema>
export type UserLoginForm = Pick<Auth, 'email'|'password'>
export type UserRegisterForm = Pick<Auth, 'email'|'password'|'password_confirmation'|'name'>



