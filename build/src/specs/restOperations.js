describe('Test response for all REST API methods', function () {
    let e2e_concourse;
    let apiClient, services = {
        getPosts: {
            path: '/posts/:postId:'
        },
        createPost: {
            path: '/posts',
            method: 'POST'
        },
        updatePost: {
            path: '/posts/:postId:',
            method: 'PUT'
        },
        patchPost: {
            path: '/posts/:postId:',
            method: 'PATCH'
        },
    };
    beforeAll(function () {
        apiClient = new e2e_concourse(this.qaUrl);
        apiClient.registerService(services);
    });
    it('Test GET method', function (done) {
        let response = {
            'userId': 1,
            'id': 1,
            'title': 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            'body': 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
        };
        apiClient.getPosts({ postId: 1 }).toJSON().then(function (actualResponse) {
            expect(actualResponse).toEqual(response);
            done();
        });
    });
    it('Test POST method', function (done) {
        let payLoad = {
            title: 'foo',
            body: 'bar',
            userId: 1
        };
        let response = {
            id: 101,
            title: 'foo',
            body: 'bar',
            userId: 1
        };
        apiClient.createPost({}, payLoad).toJSON().then(function (actualResponse) {
            expect(actualResponse).toEqual(response);
            done();
        });
    });
    it('Test PUT method', function (done) {
        let payLoad = {
            id: 1,
            title: 'foo',
            body: 'bar',
            userId: 1
        };
        let response = {
            id: 1,
            title: 'foo',
            body: 'bar',
            userId: 1
        };
        apiClient.updatePost({ postId: 1 }, payLoad).toJSON().then(function (actualResponse) {
            expect(actualResponse).toEqual(response);
            done();
        });
    });
    it('Test PATCH method', function (done) {
        let payLoad = {
            title: 'foo'
        };
        let response = {
            'userId': 1,
            'id': 1,
            'title': 'foo',
            'body': 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
        };
        apiClient.patchPost({ postId: 1 }, payLoad).toJSON().then(function (actualResponse) {
            expect(actualResponse).toEqual(response);
            done();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdE9wZXJhdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3BlY3MvcmVzdE9wZXJhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxDQUFDLHdDQUF3QyxFQUFFO0lBQ25ELElBQUksYUFBYSxDQUFDO0lBQ2QsSUFBSSxTQUFTLEVBQUUsUUFBUSxHQUFHO1FBQ3RCLFFBQVEsRUFBRTtZQUNOLElBQUksRUFBRSxpQkFBaUI7U0FDMUI7UUFDRCxVQUFVLEVBQUU7WUFDUixJQUFJLEVBQUUsUUFBUTtZQUNkLE1BQU0sRUFBRSxNQUFNO1NBQ2pCO1FBQ0QsVUFBVSxFQUFFO1lBQ1IsSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixNQUFNLEVBQUUsS0FBSztTQUNoQjtRQUNELFNBQVMsRUFBRTtZQUNQLElBQUksRUFBRSxpQkFBaUI7WUFDdkIsTUFBTSxFQUFFLE9BQU87U0FDbEI7S0FDSixDQUFDO0lBRUYsU0FBUyxDQUFDO1FBQ04sU0FBUyxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxTQUFTLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBR0gsRUFBRSxDQUFDLGlCQUFpQixFQUFFLFVBQVUsSUFBSTtRQUNoQyxJQUFJLFFBQVEsR0FBRztZQUNYLFFBQVEsRUFBRSxDQUFDO1lBQ1gsSUFBSSxFQUFFLENBQUM7WUFDUCxPQUFPLEVBQUUsNEVBQTRFO1lBQ3JGLE1BQU0sRUFBRSxtS0FBbUs7U0FDOUssQ0FBQztRQUVGLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBQyxNQUFNLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxjQUFjO1lBQ2xFLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekMsSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGtCQUFrQixFQUFFLFVBQVUsSUFBSTtRQUNqQyxJQUFJLE9BQU8sR0FBRztZQUNWLEtBQUssRUFBRSxLQUFLO1lBQ1osSUFBSSxFQUFFLEtBQUs7WUFDWCxNQUFNLEVBQUUsQ0FBQztTQUNaLENBQUM7UUFFRixJQUFJLFFBQVEsR0FBRztZQUNYLEVBQUUsRUFBRSxHQUFHO1lBQ1AsS0FBSyxFQUFFLEtBQUs7WUFDWixJQUFJLEVBQUUsS0FBSztZQUNYLE1BQU0sRUFBRSxDQUFDO1NBQ1osQ0FBQztRQUNGLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLGNBQWM7WUFDcEUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6QyxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsaUJBQWlCLEVBQUUsVUFBVSxJQUFJO1FBQ2hDLElBQUksT0FBTyxHQUFHO1lBQ1YsRUFBRSxFQUFFLENBQUM7WUFDTCxLQUFLLEVBQUUsS0FBSztZQUNaLElBQUksRUFBRSxLQUFLO1lBQ1gsTUFBTSxFQUFFLENBQUM7U0FDWixDQUFDO1FBRUYsSUFBSSxRQUFRLEdBQUc7WUFDWCxFQUFFLEVBQUUsQ0FBQztZQUNMLEtBQUssRUFBRSxLQUFLO1lBQ1osSUFBSSxFQUFFLEtBQUs7WUFDWCxNQUFNLEVBQUUsQ0FBQztTQUNaLENBQUM7UUFDRixTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUMsTUFBTSxFQUFFLENBQUMsRUFBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLGNBQWM7WUFDN0UsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6QyxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsbUJBQW1CLEVBQUUsVUFBVSxJQUFJO1FBQ2xDLElBQUksT0FBTyxHQUFHO1lBQ1YsS0FBSyxFQUFFLEtBQUs7U0FDZixDQUFDO1FBRUYsSUFBSSxRQUFRLEdBQUc7WUFDWCxRQUFRLEVBQUUsQ0FBQztZQUNYLElBQUksRUFBRSxDQUFDO1lBQ1AsT0FBTyxFQUFFLEtBQUs7WUFDZCxNQUFNLEVBQUUsbUtBQW1LO1NBQzlLLENBQUM7UUFFRixTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUMsTUFBTSxFQUFFLENBQUMsRUFBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLGNBQWM7WUFDNUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6QyxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFFUCxDQUFDLENBQUMsQ0FBQyJ9