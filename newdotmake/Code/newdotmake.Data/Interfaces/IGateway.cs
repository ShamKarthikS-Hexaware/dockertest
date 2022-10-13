using MongoDB.Driver;

namespace newdotmake.Data.Interfaces
{
    public interface IGateway
    {
        IMongoDatabase GetMongoDB();
    }
}
