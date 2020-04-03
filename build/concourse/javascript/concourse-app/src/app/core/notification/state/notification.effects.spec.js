"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/common/http/testing");
const testing_2 = require("@angular/core/testing");
const testing_3 = require("@ngrx/effects/testing");
const store_1 = require("@ngrx/store");
const fromNotification = require("./notification.reducer");
const notification_service_1 = require("../services/notification.service");
const notification_effects_1 = require("./notification.effects");
const notification_facade_1 = require("./notification.facade");
describe('NotificationEffects', () => {
    // tslint:disable-next-line:prefer-const
    let actions;
    let effects;
    let service;
    beforeEach(() => {
        testing_2.TestBed.configureTestingModule({
            imports: [
                testing_1.HttpClientTestingModule,
                store_1.StoreModule.forRoot({
                    notification: fromNotification.reducer
                })
            ],
            providers: [
                notification_effects_1.NotificationEffects,
                testing_3.provideMockActions(() => actions),
                {
                    provide: notification_service_1.NotificationService,
                    useValue: {
                        list: jest.fn(),
                        dismiss: jest.fn()
                    }
                },
                {
                    provide: notification_facade_1.NotificationFacade,
                    useValue: {}
                }
            ]
        });
        service = testing_2.TestBed.get(notification_service_1.NotificationService);
        effects = testing_2.TestBed.get(notification_effects_1.NotificationEffects);
    });
    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
    describe('dispatch registrations', () => {
        // TODO
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmVmZmVjdHMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL25vdGlmaWNhdGlvbi9zdGF0ZS9ub3RpZmljYXRpb24uZWZmZWN0cy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMERBQXVFO0FBQ3ZFLG1EQUFnRDtBQUNoRCxtREFBMkQ7QUFDM0QsdUNBQWlEO0FBRWpELDJEQUEyRDtBQUkzRCwyRUFBdUU7QUFDdkUsaUVBQTZEO0FBQzdELCtEQUEyRDtBQUUzRCxRQUFRLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFO0lBQ25DLHdDQUF3QztJQUN4QyxJQUFJLE9BQXdCLENBQUM7SUFDN0IsSUFBSSxPQUE0QixDQUFDO0lBQ2pDLElBQUksT0FBNEIsQ0FBQztJQUVqQyxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUU7Z0JBQ1AsaUNBQXVCO2dCQUN2QixtQkFBVyxDQUFDLE9BQU8sQ0FBQztvQkFDbEIsWUFBWSxFQUFFLGdCQUFnQixDQUFDLE9BQU87aUJBQ3ZDLENBQUM7YUFDSDtZQUNELFNBQVMsRUFBRTtnQkFDVCwwQ0FBbUI7Z0JBQ25CLDRCQUFrQixDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakM7b0JBQ0UsT0FBTyxFQUFFLDBDQUFtQjtvQkFDNUIsUUFBUSxFQUFFO3dCQUNSLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO3dCQUNmLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO3FCQUNuQjtpQkFDRjtnQkFDRDtvQkFDRSxPQUFPLEVBQUUsd0NBQWtCO29CQUMzQixRQUFRLEVBQUUsRUFBRTtpQkFDYjthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsT0FBTyxHQUFHLGlCQUFPLENBQUMsR0FBRyxDQUFDLDBDQUFtQixDQUFDLENBQUM7UUFDM0MsT0FBTyxHQUFHLGlCQUFPLENBQUMsR0FBRyxDQUFDLDBDQUFtQixDQUFDLENBQUM7SUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO1FBQzNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMvQixDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyx3QkFBd0IsRUFBRSxHQUFHLEVBQUU7UUFDdEMsT0FBTztJQUNULENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==