using AutoMapper;
using Aerums_API.Models;
using Aerums_API.ViewModels.BookingViewModels;

namespace Aerums_API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles() {
            CreateMap<PostBookingsViewModel, BookingModel>();
            CreateMap<BookingViewModel,BookingModel>()
            .ForMember(dest => dest.BookingsId, options => options.MapFrom(src => src.BookingsId));
        }
    }
}