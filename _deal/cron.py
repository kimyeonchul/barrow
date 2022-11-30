from apscheduler.schedulers.background import BackgroundScheduler
from .models import Deal

import datetime
from datetime import datetime

def job():
    deals = Deal.objects.all()
    now = datetime.now()
    for deal in deals:
        if deal.end_date < now and deal.state == "LEND":
            deal.state = "TERMINATE"
            deal.save()
        


def _main():
    sched = BackgroundScheduler()
    sched.add_job(job,'interval', seconds=3, id='test')
    sched.start()