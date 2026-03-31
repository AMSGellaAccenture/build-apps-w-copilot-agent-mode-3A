from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='marvel', description='Marvel Superheroes')
        dc = Team.objects.create(name='dc', description='DC Superheroes')

        # Create users
        tony = User.objects.create(email='tony@stark.com', name='Tony Stark', team=marvel.name)
        steve = User.objects.create(email='steve@rogers.com', name='Steve Rogers', team=marvel.name)
        bruce = User.objects.create(email='bruce@wayne.com', name='Bruce Wayne', team=dc.name)
        clark = User.objects.create(email='clark@kent.com', name='Clark Kent', team=dc.name)

        # Create workouts
        pushups = Workout.objects.create(name='Pushups', description='Do 50 pushups', suggested_for='marvel')
        running = Workout.objects.create(name='Running', description='Run 5km', suggested_for='dc')

        # Create activities
        Activity.objects.create(user=tony, type='pushups', duration=10, date='2023-01-01')
        Activity.objects.create(user=steve, type='running', duration=30, date='2023-01-02')
        Activity.objects.create(user=bruce, type='pushups', duration=15, date='2023-01-03')
        Activity.objects.create(user=clark, type='running', duration=25, date='2023-01-04')

        # Create leaderboard
        Leaderboard.objects.create(user=tony, score=200, rank=1)
        Leaderboard.objects.create(user=steve, score=180, rank=2)
        Leaderboard.objects.create(user=bruce, score=170, rank=3)
        Leaderboard.objects.create(user=clark, score=160, rank=4)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data'))
