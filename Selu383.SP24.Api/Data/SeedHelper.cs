using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.Hotels;

namespace Selu383.SP24.Api.Data;

public static class SeedHelper
{
    public static async Task MigrateAndSeed(IServiceProvider serviceProvider)
    {
        var dataContext = serviceProvider.GetRequiredService<DataContext>();

        await dataContext.Database.MigrateAsync();

        await AddRoles(serviceProvider);
        await AddUsers(serviceProvider);

        await AddHotels(dataContext);
    }

    private static async Task AddUsers(IServiceProvider serviceProvider)
    {
        const string defaultPassword = "Password123!";
        var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

        if (userManager.Users.Any())
        {
            return;
        }

        var adminUser = new User
        {
            UserName = "galkadi"
        };
        await userManager.CreateAsync(adminUser, defaultPassword);
        await userManager.AddToRoleAsync(adminUser, RoleNames.Admin);

        var bob = new User
        {
            UserName = "bob"
        };
        await userManager.CreateAsync(bob, defaultPassword);
        await userManager.AddToRoleAsync(bob, RoleNames.User);

        var sue = new User
        {
            UserName = "sue"
        };
        await userManager.CreateAsync(sue, defaultPassword);
        await userManager.AddToRoleAsync(sue, RoleNames.User);
    }

    private static async Task AddRoles(IServiceProvider serviceProvider)
    {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<Role>>();
        if (roleManager.Roles.Any())
        {
            return;
        }
        await roleManager.CreateAsync(new Role
        {
            Name = RoleNames.Admin
        });

        await roleManager.CreateAsync(new Role
        {
            Name = RoleNames.User
        });
    }

    private static async Task AddHotels(DataContext dataContext)
    {
        var hotels = dataContext.Set<Hotel>();

        if (await hotels.AnyAsync())
        {
            return;
        }


        dataContext.Set<Hotel>()
            .Add(new Hotel
            {
                Name = "The Ritz ",
                Address = "1234 Place st, Hammond LA, 70403"
            });

        dataContext.Set<Hotel>()
            .Add(new Hotel
            {
                Name = "<p>test</p> ",
                Address = "wat"
            });


        dataContext.Set<Hotel>()
            .Add(new Hotel
            {
                Name = "The Grand",
                Address = "1 Grand St, Big Money "
            });

        await dataContext.SaveChangesAsync();
    }
}
