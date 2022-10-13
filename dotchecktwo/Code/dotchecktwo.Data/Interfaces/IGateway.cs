using MongoDB.Driver;

namespace dotchecktwo.Data.Interfaces
{
    public interface IGateway
    {
        IMongoDatabase GetMongoDB();
    }
}
