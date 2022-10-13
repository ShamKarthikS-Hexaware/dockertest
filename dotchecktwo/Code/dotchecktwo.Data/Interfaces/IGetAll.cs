using System.Collections.Generic;

namespace dotchecktwo.Data.Interfaces
{
    public interface IGetAll<T> where T : class
    {
        IEnumerable<T> GetAll();
    }
}
