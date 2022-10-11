using MongoDB.Driver;

namespace dockerdot.Data.Interfaces
{
    public interface IGateway
    {
        IMongoDatabase GetMongoDB();
    }
}
