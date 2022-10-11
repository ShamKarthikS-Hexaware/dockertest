using MongoDB.Driver;

namespace newdotcd.Data.Interfaces
{
    public interface IGateway
    {
        IMongoDatabase GetMongoDB();
    }
}
