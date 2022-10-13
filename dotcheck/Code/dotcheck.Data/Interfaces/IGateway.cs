using MongoDB.Driver;

namespace dotcheck.Data.Interfaces
{
    public interface IGateway
    {
        IMongoDatabase GetMongoDB();
    }
}
