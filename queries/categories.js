import { replaceMongoIdInArray } from '@/lib/convertData'
import { CategoryModel } from '@/models/categoryModel'

export async function getCategories() {
  const categories = await CategoryModel.find({}).lean()
  return replaceMongoIdInArray(categories)
}
