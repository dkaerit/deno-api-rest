// deno-lint-ignore-file no-explicit-any
import { Collection } from "../../_dependencies/mongo.ts";

export const Query = { 

    /**
     * @title Create Entry (insertOne)
     * @brief 
     * @param 
     * @param 
     * @return 
     */
   
    async createEntry(entry:Record<string,unknown>, collection:Collection<any>): Promise<any> {
      try {
        return (await collection.insertOne(entry)).toString();
      } catch(error) { return error as Error; }
    },
    
    /**
     * @title Get Entries (find)
     * @brief 
     * @param 
     * @param 
     * @return 
     */
  
    async getEntries(skip:number, limit:number, collection:Collection<any>): Promise<any> {
      return await collection.find(
        {}, 
        { noCursorTimeout: false } as Record<string,unknown>)
        .skip(skip).limit(limit).toArray();
    },

    /**
     * @title Find by filter (findOne)
     * @brief 
     * @param 
     * @param 
     * @return 
     */
  
    async findByFilter(field:string, filter:string, collection:Collection<any>): Promise<any> {
      try {
        return await collection.findOne(
          { [field]: filter }, 
          { noCursorTimeout: false } as Record<string,unknown>);
      } catch(error) { return error as Error; }
    },

    /**
     * @title Find by filters (findOne)
     * @brief 
     * @param 
     * @param 
     * @return 
     */
  
    async findByFilters(filter:Record<string,any>, collection:Collection<any>): Promise<any> {
      try {
        return await collection.findOne(
          filter, 
          { noCursorTimeout: false } as Record<string,unknown>);
      } catch(error) { return error as Error; }
    },
    
    /**
     * @title Update Entry (updateOne)
     * @brief 
     * @param 
     * @param 
     * @return 
     */
  
    async updateEntry(field:string, filter:string, entry:Record<string,unknown>, collection:Collection<any>): Promise<any> {
      try {
        const update = { $set: entry };
        return await collection.updateOne({ [field]: filter }, update);
      } catch(error) { return error as Error; }
    },

    /**
     * @title Delete Entry (deleteOne)
     * @brief 
     * @param 
     * @param 
     * @return 
     */  
  
    async deleteEntry(field:string, filter:string, collection:Collection<any>): Promise<any> {
      try {
        return await collection.deleteOne(
          { [field]: filter });
      } catch(error) { return error as Error; }
    },
  
  }