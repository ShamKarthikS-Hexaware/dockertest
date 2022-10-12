using NSubstitute;
using newdotcd.Test.Framework;
using newdotcd.Business.Services;
using newdotcd.Data.Interfaces;

namespace newdotcd.Test.Business.HumanServiceSpec
{
    public abstract class UsingHumanServiceSpec : SpecFor<HumanService>
    {
        protected IHumanRepository _humanRepository;

        public override void Context()
        {
            _humanRepository = Substitute.For<IHumanRepository>();
            subject = new HumanService(_humanRepository);

        }

    }
}
