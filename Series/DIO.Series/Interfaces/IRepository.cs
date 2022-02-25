using System.Collections.Generic;

namespace DIO.Series.Interfaces
{
    public interface IRepository<T>
    {
         List<T> List();
         T ReturnByID(int id);
         void Insert(T entry);
         void Delete(int id);
         void Update(int id, T entry);
         int NextID();
    }
}